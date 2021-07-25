export abstract class Generic<T> {
    protected parent = this;
    protected getParent(): Generic<T> {
        let parent = this.parent;

        while (parent.parent !== parent) {
            parent = parent.parent;
        }
        
        return parent;
    }

    public abstract create(): T;
}