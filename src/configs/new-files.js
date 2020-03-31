Object.defineProperty(exports, 'items', {
  value: [
    {
      path: '../.prettierrc',
      content:
        '{\r\n"printWidth": 100,\r\n"singleQuote": true,\r\n"trailingComma": "all",\r\n"semi": false,\r\n"arrowParens": "always"\r\n}',
    },
    {
      path: '.htaccess',
      content:
        'RewriteEngine On\r\n\r\nRewriteCond %{HTTPS}  !=on\r\nRewriteRule ^/?(.*) https://%{SERVER_NAME}/$1 [R,L]\r\n# If an existing asset or directory is requested go to it as it is\r\nRewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]\r\nRewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d\r\n# Go to it as is\r\nRewriteRule ^ - [L]\r\n\r\n# If the requested resource doesn\'t exist, use index.html\r\nRewriteRule ^ /index.html\r\n\r\nSetOutputFilter DEFLATE\r\nAddOutputFilterByType DEFLATE "application/atom+xml" "application/javascript" "application/json" "application/ld+json" "application/manifest+json" "application/rdf+xml" "application/rss+xml" "application/schema+json" "application/vnd.geo+json" "application/vnd.ms-fontobject" "application/x-font-ttf" "application/x-javascript" "application/x-web-app-manifest+json" "application/xhtml+xml" "application/xml" "font/eot" "font/opentype" "image/bmp" "image/svg+xml" "image/vnd.microsoft.icon" "image/x-icon" "text/cache-manifest" "text/css" "text/html" "text/javascript" "text/plain" "text/vcard" "text/vnd.rim.location.xloc" "text/vtt" "text/x-component" "text/x-cross-domain-policy" "text/xml"',
    },
    {
      path: 'app/configs/global.config.ts',
      content:
        "import { version } from '../../../package.json'\r\n\r\nexport const VERSION = version\r\nexport const BASEURL = 'https://api-baseurl.ch/'",
    },
    {
      path: 'app/core/models/core.enums.ts',
      content: 'export enum RoutesEnum {}',
    },
    {
      path: 'app/core/models/core.types.ts',
      content: "// type ModalSaveAction = 'save' | 'delete'",
    },
    {
      path: 'app/core/models/core.interfaces.ts',
      content: '// export interface SideNavigation {}',
    },
    {
      path: 'app/core/models/core.models.ts',
      content: '// export class Session { constructor(){} }',
    },
    {
      path: 'scss/base/_colors.scss',
      content:
        '$use-default-colors-map: true;\r\n\r\n$us-color-settings: (\r\n  primary: (\r\n    base: #3880ff,\r\n  ),\r\n  secondary: (\r\n    base: #0cd1e8,\r\n  ),\r\n  tertiary: (\r\n    base: #7044ff,\r\n  ),\r\n  light: (\r\n    base: #f4f5f8,\r\n  ),\r\n  medium: (\r\n    base: #989aa2,\r\n  ),\r\n  dark: (\r\n    base: #222428,\r\n  ),\r\n);\r\n\r\n$color-darken: 12%;\r\n$color-lighten: 12%;\r\n$color-opacity: 0.3;\r\n\r\n$isDeeper: false;\r\n$isDeepest: false;',
    },
    {
      path: 'scss/_shared.scss',
      content: "// Us-mixin\r\n@import '~@ultrastark/us-mixin/mixin';",
    },
    {
      path: 'scss/main.scss',
      content:
        "// Base\r\n@import 'base/colors';\r\n@import 'shared';\r\n\r\n// Vendors\r\n@import '~@ultrastark/us-mixin/utilities';",
    },
  ],
  enumerable: true,
  writable: false,
  configurable: false,
})
