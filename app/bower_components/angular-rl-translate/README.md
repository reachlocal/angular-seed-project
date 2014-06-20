# rl.l10n
This is a wrapper for two third-party l10n and i18n libraries.  It'll make translating
your project much much easier.  It handles string translations, pluralization, and
number/date/currency formatting.

# Quick Start
This module is a friendly wrapper for some underlying translation libraries.  Please read more about
them to get more details on translating and formatting stuff.

* [angular-translate](http://angular-translate.github.io/)
* [angular-i18n](https://docs.angularjs.org/guide/i18n)

## Install It
Run this command to install this into your project using bower.

`bower install --save ssh://git@stash.lax.reachlocal.com/cpi/angular-rl-l10n.git'

Add this module as a dependency and configure it with a .run() block
```javascript
angular.module('rl.myapp', ['rl.l10n'])
  .run(function (LocaleSettings) {
    // Set your initial locale
    LocaleSettings.locale('en');
    
    // Set your default locale
    // If we can't find a translation in your selected locale,
    // we'll look for it using this locale - this is a fallback
    LocaleSettings.defaultLocale('en');
    
    // What locales are available?
    LocaleSettings.locales(['en', 'pt']);
  });
```

### Create lang-[locale].json files
This module will lazy load your translations on demand.  It will look for them using this pattern: `/l10n/lang-[locale].json`

Example:  When I pick the 'en' locale, this module will fetch `/l10n/lang-en.json` and re-parse all translations on the page
                   
### Create bower_components/angular-i18n/*
You *must* place an un-minified copy of the angular-i18n module in this path.  We're using angular's
number formatting filters, but they can't be loaded all at once - they overwrite each other.  The loader
we're using fetches them on demand.

Example:  When I pick the 'en' locale, this module will fetch `/bower_components/angular-i18n/angular-locale_en.js` and re-parse all formatted numbers, dates, and currencies

## Use It
There are more examples and documentation out there for angular-translate, angular-i18n, and messageformat.  Here's some basics to get your started.

### How Do I Translate a String?
If I want my string "My String!" to be translated to "Viva La English!", I could do it like this...

#### HTML
```html
<translate>My String!</translate>
```

#### lang-en.json
```json
{
  "My String!": "Viva La English!"
}
```

I could also do this....

#### HTML
```html
{{ "My String!" | translate }}
```

Or, if I need to translate something in a controller or service, I could use the $translate service...

### How Do I Pluralize a String?
If I have a string like this:  "There are {some number} thing(s)", I want it to pluralize correctly
It should read like this: "There is 1 thing" or "There are 25 things"
We're using the "messageformat" standard to pluralize stuff.  (Google it.)  Here's an example.
 
#### HTML
```html
<translate
  translate-value-count="{{ someNumberOfThings }}">
myPage.There are {count} things(s)
</translate>
```

#### lang-en.json
```json
{
  "myPage": {
    "There are {count} thing(s)": "There { count, plural, one{is} other{are} } { count } { count, plural, one{thing} other{things} }"
  }
}
```

### How Do I Format a Number?
Use Angular's number/date/currency format filter.  We'll load the right filter for whatever language you're using.
This will ensure your number looks like this "1,000,000.00" or this "1.000.000,00" as appropriate.

#### HTML
```html
{{ myNumber | number }}
```

### How Do I Render a Languge Drop-Down on My Page?
There's a directive for that included in this module.  It will list all locales you have configured.

```html
<rl-locale-selector></rl-locale-selector>
```

If any of the *names* of locales in the drop-down aren't being translated, just add some translations.

#### lang-en.json
```json
{
  "rlLocaleSelector": {
    "en": "English (US)",
    "pt": "Portuguese (BR)"
  }
}
```
