"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlayerRoutes = createPlayerRoutes;
const express_1 = require("express");
function createPlayerRoutes(controller) {
    const router = (0, express_1.Router)();
    router.get("/search", controller.search);
    router.get("/team/:teamId", controller.getByTeam);
    router.get("/:id/detail", controller.getDetail);
    router.get("/:id", controller.getById);
    return router;
}
//# sourceMappingURL=playerRoutes.js.map