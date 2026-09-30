Pinned, scroll-scrubbed scene; children receive progress 0→1 to drive ProductShot z/scale/blur.
```jsx
<ScrollScene length={220}>{p => <DepthStage height="70vh"><ProductShot src="…" z={-80 + p*120} /></DepthStage>}</ScrollScene>
```
On mobile use length={100} (no pin) and fade-only reveals.
