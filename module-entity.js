class Entity {
    constructor(x, y, { render, update, ...options }) {

        this.position = new Vector(x, y);
        Object.assign(this, options);
        if (typeof render == "function") this.setRender(render);
        if (typeof update == "function") this.setUpdate(update);
    }

    setRender(f) {
        if (f instanceof Function) this.render = f;
    }

    setUpdate(f) {
        if (f instanceof Function) this.update = f;
    }

    render(f) {

    }

    update(f) {

    }

    remove() {
        this.doRemove = true;
    }

    removeNow() {
        this.holder.entities = this.holder.entities.filter(entity !== this);
    }

    static add(entity, sketch) {
        if (!(entity instanceof Entity)) throw new Error("Must pass a valid entity as first parameter");
        else if (!(sketch instanceof Sketch) && Sketches.curr == null) throw new Error("Outside sketch method: Must pass a Sketch instance as second parameter");
        else {
            entity.holder = sketch || Sketches.curr;
            if(!entity.holder.entities) entity.holder.entities = [];
            entity.holder.entities.push(entity);
            return entity;
        }
    }

    static get(sketch) {
        if (!(sketch instanceof Sketch) && Sketches.curr == null) throw new Error("Outside sketch method: Must pass a Sketch instance as second parameter");
        else return (sketch || Sketches.curr).entities;
    }

    static getByName(name, sketch) {
        if (!(sketch instanceof Sketch) && Sketches.curr == null) throw new Error("Outside sketch method: Must pass a Sketch instance as second parameter");
        else {
            const result = (sketch || Sketches.curr).entities.filter(entity => entity.name == name);
            return result.length == 1 ? result[0] : result;
        }
    }

    static loop(sketch) {
        if (!(sketch instanceof Sketch) && Sketches.curr == null) throw new Error("Outside sketch method: Must pass a Sketch instance as second parameter");
        else {
            if(sketch) fetchIntoGlobal(sketch);
            (sketch || Sketches.curr).entities.forEach(entity => {
                entity.update();
                entity.render(entity);
            });
            if(sketch) clearGlobal;
        }
    }
}

const Render = {
    circle(obj) {
        if (!obj.radius) return new Error("Radius not set for shape circle");

        const sketch = obj.holder;
        if (obj.fill) sketch.fill(obj.fill);
        if (obj.stroke) sketch.stroke(obj.stroke);
        obj.holder.circle(obj.position.x, obj.position.y, obj.radius);
    },
    rect(obj) {
        if (!obj.width) return new Error("Width not set for shape rect");

        const sketch = obj.holder;
        if (obj.fill) sketch.fill(obj.fill);
        if (obj.stroke) sketch.stroke(obj.stroke);
        obj.holder.rect(obj.position.x, obj.position.y, obj.width, obj.height);
    }
}