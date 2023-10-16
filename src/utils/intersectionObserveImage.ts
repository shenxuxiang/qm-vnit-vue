class IntersectionObserveImage {
  public nodeMap = new Map<Element, string>();
  public instance!: IntersectionObserver;

  intersectionCallback(entries: IntersectionObserverEntry[]) {
    entries.forEach((item) => {
      const { target, intersectionRatio } = item;
      if (intersectionRatio > 0) {
        if (this.nodeMap.has(target)) {
          const imgURL = this.nodeMap.get(target);
          (target as HTMLImageElement).src = imgURL!;
          this.removeElement(target);
        }
      }
    });
  }

  init() {
    this.instance = new window.IntersectionObserver(this.intersectionCallback.bind(this));
  }

  addElement(node: Element, src: string) {
    if (!this.instance) this.init();
    this.instance!.observe(node);
    this.nodeMap.set(node, src);
  }

  removeElement(node: Element) {
    this.instance!.unobserve(node);
    this.nodeMap.delete(node);
  }

  disconnect() {
    this.instance!.disconnect();
  }
}

export default new IntersectionObserveImage();
