# Gallery Images

Place gallery photos in this folder, for example:

```
public/images/photo-1.jpg
public/images/photo-2.jpg
```

Then open `src/components/Gallery.jsx` and set the `src` field for each item
in the `GALLERY_ITEMS` array, e.g.:

```js
{ id: 1, src: `${import.meta.env.BASE_URL}images/photo-1.jpg` }
```

Frames without a `src` automatically display an elegant monogram
placeholder, so the gallery always looks polished even before real photos
are added.
