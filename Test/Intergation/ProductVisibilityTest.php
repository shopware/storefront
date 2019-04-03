<?php declare(strict_types=1);

namespace Shopware\Storefront\Test\Intergation;

use PHPUnit\Framework\TestCase;
use Shopware\Core\Content\Product\Aggregate\ProductVisibility\ProductVisibilityDefinition;
use Shopware\Core\Content\Product\Exception\ProductNotFoundException;
use Shopware\Core\Defaults;
use Shopware\Core\Framework\Api\Util\AccessKeyHelper;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\Routing\InternalRequest;
use Shopware\Core\Framework\Test\TestCaseBase\IntegrationTestBehaviour;
use Shopware\Core\Framework\Uuid\Uuid;
use Shopware\Core\System\SalesChannel\Context\CheckoutContextFactory;
use Shopware\Storefront\Page\Listing\ListingPage;
use Shopware\Storefront\Page\Listing\ListingPageLoader;
use Shopware\Storefront\Page\Product\ProductPageLoader;
use Shopware\Storefront\Page\Search\SearchPage;
use Shopware\Storefront\Page\Search\SearchPageLoader;
use Shopware\Storefront\Pagelet\Suggest\SuggestPageletLoader;

class ProductVisibilityTest extends TestCase
{
    use IntegrationTestBehaviour;

    /**
     * @var string
     */
    private $salesChannelId1;

    /**
     * @var string
     */
    private $salesChannelId2;

    /**
     * @var string
     */
    private $productId1;

    /**
     * @var string
     */
    private $productId2;

    /**
     * @var string
     */
    private $productId3;

    /**
     * @var string
     */
    private $productId4;

    /**
     * @var SearchPageLoader
     */
    private $searchPageLoader;

    /**
     * @var SuggestPageletLoader
     */
    private $suggestPageletLoader;

    /**
     * @var ListingPageLoader
     */
    private $listingPageLoader;

    /**
     * @var CheckoutContextFactory
     */
    private $contextFactory;

    /**
     * @var EntityRepositoryInterface
     */
    private $productRepository;

    /**
     * @var ProductPageLoader
     */
    private $productPageLoader;

    protected function setUp(): void
    {
        parent::setUp();

        $this->listingPageLoader = $this->getContainer()->get(ListingPageLoader::class);
        $this->searchPageLoader = $this->getContainer()->get(SearchPageLoader::class);
        $this->suggestPageletLoader = $this->getContainer()->get(SuggestPageletLoader::class);
        $this->productPageLoader = $this->getContainer()->get(ProductPageLoader::class);

        $this->productRepository = $this->getContainer()->get('product.repository');
        $this->contextFactory = $this->getContainer()->get(CheckoutContextFactory::class);

        $this->insertData();
    }

    public function testVisibilityInListing()
    {
        $checkoutContext = $this->contextFactory->create(Uuid::randomHex(), $this->salesChannelId1);

        $request = new InternalRequest();

        /** @var ListingPage $page */
        $page = $this->listingPageLoader->load($request, $checkoutContext);
        static::assertCount(1, $page->getListing());
        static::assertTrue($page->getListing()->has($this->productId3));

        $checkoutContext = $this->contextFactory->create(Uuid::randomHex(), $this->salesChannelId2);
        $page = $this->listingPageLoader->load($request, $checkoutContext);
        static::assertCount(1, $page->getListing());
        static::assertTrue($page->getListing()->has($this->productId1));
    }

    public function testVisibilityInSearch()
    {
        $checkoutContext = $this->contextFactory->create(Uuid::randomHex(), $this->salesChannelId1);

        $request = new InternalRequest(['search' => 'test']);

        /** @var SearchPage $page */
        $page = $this->searchPageLoader->load($request, $checkoutContext);

        static::assertCount(2, $page->getListing());
        static::assertTrue($page->getListing()->has($this->productId2));
        static::assertTrue($page->getListing()->has($this->productId3));

        $checkoutContext = $this->contextFactory->create(Uuid::randomHex(), $this->salesChannelId2);
        $page = $this->searchPageLoader->load($request, $checkoutContext);

        static::assertCount(2, $page->getListing());
        static::assertTrue($page->getListing()->has($this->productId1));
        static::assertTrue($page->getListing()->has($this->productId2));
    }

    public function testVisibilityOnProductPage()
    {
        $cases = [
            ['salesChannelId' => $this->salesChannelId1, 'productId' => $this->productId1, 'visible' => false],
            ['salesChannelId' => $this->salesChannelId1, 'productId' => $this->productId2, 'visible' => true],
            ['salesChannelId' => $this->salesChannelId1, 'productId' => $this->productId3, 'visible' => true],
            ['salesChannelId' => $this->salesChannelId1, 'productId' => $this->productId4, 'visible' => true],
            ['salesChannelId' => $this->salesChannelId2, 'productId' => $this->productId1, 'visible' => true],
            ['salesChannelId' => $this->salesChannelId2, 'productId' => $this->productId2, 'visible' => true],
            ['salesChannelId' => $this->salesChannelId2, 'productId' => $this->productId3, 'visible' => true],
            ['salesChannelId' => $this->salesChannelId2, 'productId' => $this->productId4, 'visible' => false],
        ];

        foreach ($cases as $case) {
            $checkoutContext = $this->contextFactory->create(Uuid::randomHex(), $case['salesChannelId']);

            $request = new InternalRequest([], [], ['productId' => $case['productId']]);

            $e = null;
            try {
                $page = $this->productPageLoader->load($request, $checkoutContext);
            } catch (\Exception $e) {
            }

            if ($case['visible']) {
                static::assertTrue($e === null, 'Exception is not be thrown.');
                static::assertSame($case['productId'], $page->getProduct()->getId());
                continue;
            }

            static::assertInstanceOf(ProductNotFoundException::class, $e);
        }
    }

    public function testVisibilityInSuggest()
    {
        $checkoutContext = $this->contextFactory->create(Uuid::randomHex(), $this->salesChannelId1);

        $request = new InternalRequest(['search' => 'test']);

        /** @var SearchPage $page */
        $page = $this->suggestPageletLoader->load($request, $checkoutContext);

        static::assertCount(2, $page->getListing());
        static::assertTrue($page->getListing()->has($this->productId2));
        static::assertTrue($page->getListing()->has($this->productId3));

        $checkoutContext = $this->contextFactory->create(Uuid::randomHex(), $this->salesChannelId2);
        $page = $this->searchPageLoader->load($request, $checkoutContext);

        static::assertCount(2, $page->getListing());
        static::assertTrue($page->getListing()->has($this->productId1));
        static::assertTrue($page->getListing()->has($this->productId2));
    }

    private function insertData()
    {
        $this->salesChannelId1 = $this->createSalesChannel();
        $this->salesChannelId2 = $this->createSalesChannel();

        $this->productId1 = Uuid::randomHex();
        $this->productId2 = Uuid::randomHex();
        $this->productId3 = Uuid::randomHex();
        $this->productId4 = Uuid::randomHex();

        $products = [
            $this->createProduct($this->productId1, [
                $this->salesChannelId2 => ProductVisibilityDefinition::VISIBILITY_ALL,
            ]),
            $this->createProduct($this->productId2, [
                $this->salesChannelId1 => ProductVisibilityDefinition::VISIBILITY_SEARCH,
                $this->salesChannelId2 => ProductVisibilityDefinition::VISIBILITY_SEARCH,
            ]),
            $this->createProduct($this->productId3, [
                $this->salesChannelId1 => ProductVisibilityDefinition::VISIBILITY_ALL,
                $this->salesChannelId2 => ProductVisibilityDefinition::VISIBILITY_LINK,
            ]),
            $this->createProduct($this->productId4, [
                $this->salesChannelId1 => ProductVisibilityDefinition::VISIBILITY_LINK,
            ]),
        ];

        $context = Context::createDefaultContext();

        $this->productRepository->create($products, $context);
    }

    private function createProduct(string $id, array $visibilities): array
    {
        $mapped = [];
        foreach ($visibilities as $salesChannel => $visibility) {
            $mapped[] = ['salesChannelId' => $salesChannel, 'visibility' => $visibility];
        }

        return [
            'id' => $id,
            'stock' => 1,
            'name' => 'test',
            'price' => ['gross' => 15, 'net' => 10, 'linked' => false],
            'manufacturer' => ['name' => 'test'],
            'tax' => ['name' => 'test', 'taxRate' => 15],
            'visibilities' => $mapped,
        ];
    }

    private function createSalesChannel(): string
    {
        $id = Uuid::randomHex();

        $data = [
            'id' => $id,
            'accessKey' => AccessKeyHelper::generateAccessKey('sales-channel'),
            'navigation' => ['name' => 'test'],
            'typeId' => Defaults::SALES_CHANNEL_STOREFRONT_API,
            'languageId' => Defaults::LANGUAGE_SYSTEM,
            'currencyId' => Defaults::CURRENCY,
            'currencyVersionId' => Defaults::LIVE_VERSION,
            'paymentMethodId' => $this->getValidPaymentMethodId(),
            'paymentMethodVersionId' => Defaults::LIVE_VERSION,
            'shippingMethodId' => $this->getValidShippingMethodId(),
            'shippingMethodVersionId' => Defaults::LIVE_VERSION,
            'countryId' => $this->getValidCountryId(),
            'countryVersionId' => Defaults::LIVE_VERSION,
            'currencies' => [['id' => Defaults::CURRENCY]],
            'languages' => [['id' => Defaults::LANGUAGE_SYSTEM]],
            'shippingMethods' => [['id' => $this->getValidShippingMethodId()]],
            'paymentMethods' => [['id' => $this->getValidPaymentMethodId()]],
            'countries' => [['id' => $this->getValidCountryId()]],
            'name' => 'first sales-channel',
            'customerGroupId' => Defaults::FALLBACK_CUSTOMER_GROUP,
        ];

        $this->getContainer()->get('sales_channel.repository')->create([$data], Context::createDefaultContext());

        return $id;
    }
}
