A real BoostChat screenshot on a 2.5D depth plane with soft shadow; animate via z / scale / blur props from scroll progress.
```jsx
<ProductShot src="assets/product/layer-portfolio-card.png" z={60} elevation="float" style={{right:'4%',top:'30%',width:'30%'}} />
```
elevation: window (site frames) · float (cards lifted above) · device (phones). Keep rotate ≤ 2°, blur ≤ 8px.
