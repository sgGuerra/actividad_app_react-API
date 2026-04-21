"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeamRoutes = createTeamRoutes;
const express_1 = require("express");
function createTeamRoutes(controller) {
    const router = (0, express_1.Router)();
    router.get("/search", controller.search);
    router.get("/league/:league", controller.getByLeague);
    router.get("/:id/players", controller.getPlayers);
    router.get("/:id", controller.getById);
    return router;
}
//# sourceMappingURL=teamRoutes.js.map