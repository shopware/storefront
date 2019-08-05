<?php
declare(strict_types=1);

namespace Shopware\Storefront\Framework\Twig;

use Shopware\Core\Framework\Twig\TemplateFinder;
use Shopware\Storefront\Framework\Twig\TokenParser\ThumbnailTokenParser;
use Twig\Extension\AbstractExtension;

class ThumbnailExtension extends AbstractExtension
{
    /**
     * @var TemplateFinder
     */
    private $finder;

    public function __construct(TemplateFinder $finder)
    {
        $this->finder = $finder;
    }

    public function getTokenParsers(): array
    {
        return [
            new ThumbnailTokenParser(),
        ];
    }

    public function getFinder(): TemplateFinder
    {
        return $this->finder;
    }
}
