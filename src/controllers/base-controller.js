class BaseController {
    constructor(service) {
        this.service = service;
        // Enlazar métodos para preservar el contexto
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
    }

    async getAll(req, res, next) {
        try {
            const items = await this.service.getAll();
            res.json(items);
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const item = await this.service.getById(id);
            res.json(item);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const newItem = await this.service.create(req.body);
            res.json(newItem);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const updatedItem = await this.service.update(id, req.body);
            res.json(updatedItem);
        } catch (error) {
            next(error);
        }
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params;
            const deletedItem = await this.service.remove(id);
            res.json(deletedItem);
        } catch (error) {
            next(error);
        }
    }
}

export default BaseController;
