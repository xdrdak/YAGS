# YAGS - Yet Another Grid System

*WORK STILL IN PROGRESS. CODE IS ABSOLUTE GARBAGE*

YAGS is a small and probably overkill webapp to generate your css-grids with fallbacks. Just copy and paste the generated
output. Eventually, I'll make some css generator functions exportable.

#### The case for css-grids
Get hyped for css-grids cause it works incredibly well and it has amazing browser support!
But, in case you're skittish and want to support stanky old browsers, you'll want to have some form
of minor fallbacks. This is where YAGS got you covered.

Use css-grids today, don't wait! Stop trying to make things look exactly the same between modern and legacy browsers.
We're already making things different from desktop and mobile, so why not have the same philosophies with the legacy stuff?

As long as the core functionalities remain exactly the same and still looks serviceable, the end-user won't care!

#### Tips on how to make things serviceable on legacy stuff

So you absolutely need to support ie10, does that mean to write off css-grids entirely? Absolutely not!

Here's a few suggestions that will make the transition more tolerable.

1. Let users on legacy browsers experience the mobile version of a grid/design.
If your mobile design is good, then chances are, it should be serviceable on desktop.
Check [wikipedia](https://en.m.wikipedia.org/wiki/Main_Page) for mobile. It looks amazing even on desktop, probably better
than the regular website!

2. Provide a few flexbox/float fallbacks. Sometimes, you have an image grid and don't want to have everything on a single
column for desktop. This is where the flexbox/float fallback comes in handy. Simply plug a quick fallback or two for
legacy browsers and clients will be happy campers. So what if they don't have the first video bigger than the others
or that there are less breakpoints? If the function is pretty much the same, you're in the clear!

3. Don't ditch flexbox entirely. Sometimes, flexbox is still the valid solution! Right tool for the right job folks.

#### TODO

- [x] Make a todo list
- [ ] CSS generation provided by app
- [ ] SASS function to generate a grid with fallback
- [ ] LESS function to generate a grid with fallback
- [ ] Javascript function to create strings corresponding to grid with fallback
- [x] ~CSS-Modules function to generate a grid with fallback~ a ha ha, hell no.

### Running the app locally

It's as simple as...
```sh
npm i
npm run dev
```
