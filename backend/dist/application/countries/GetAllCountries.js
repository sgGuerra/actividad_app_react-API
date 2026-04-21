"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllCountries = void 0;
class GetAllCountries {
    constructor(countryRepository) {
        this.countryRepository = countryRepository;
    }
    async execute() {
        return this.countryRepository.findAll();
    }
}
exports.GetAllCountries = GetAllCountries;
//# sourceMappingURL=GetAllCountries.js.map