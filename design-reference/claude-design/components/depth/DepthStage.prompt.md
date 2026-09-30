Perspective wrapper that gives product screenshots layered depth with a tiny cursor tilt; wrap every hero/scene visual in one.
```jsx
<DepthStage height={560}>
  <ProductShot src="assets/product/layer-site-hero.png" z={-60} style={{left:0,top:40,width:'62%'}} />
  <ProductShot src="assets/product/layer-chat-widget.png" z={50} elevation="float" style={{right:0,top:0,width:'32%'}} />
</DepthStage>
```
`tilt` defaults to 1.5°; set 0 on mobile layouts.
