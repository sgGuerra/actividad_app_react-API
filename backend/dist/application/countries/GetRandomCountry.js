"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRandomCountry = void 0;
class GetRandomCountry {
    constructor(countryRepository) {
        this.countryRepository = countryRepository;
    }
    async execute() {
        return this.countryRepository.findRandom();
    }
}
exports.GetRandomCountry = GetRandomCountry;
//# sourceMappingURL=GetRandomCountry.js.map