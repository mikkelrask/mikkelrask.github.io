~~- Images are opacity 0~~
**Problem:**

In the `PostList` component, images set via a post's frontmatter (when `frontpageImage` is true) do not display on the first page load. While the images do load (network requests succeed), they remain with `opacity: 0` and never become visible. If the page is refreshed, the images show up immediately as expected. Changing image loading from `lazy` to `eager` did not fix the issue. On individual post pages, image display works correctly—this problem only affects the frontpage where `PostList` is used.

**Expected behavior:**
Images with `frontpageImage: true` in frontmatter should appear (opacity 1) on the first page load, just as they do after a refresh or on post pages.

**Steps to reproduce:**
1. Open the site frontpage (where `PostList` component is used).
2. Observe that images with `frontpageImage: true` are in the DOM but have `opacity: 0` and do not become visible.
3. Refresh the page—images now show up instantly as expected.

**Attempts to fix:**
- Changed image loading from `lazy` to `eager`, but issue persists.

**Notes:**
- This bug is frontpage-only. Individual post pages work fine.
- The images do load (not a 404 or loading problem) but are not revealed visually.


