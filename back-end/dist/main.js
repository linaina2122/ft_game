"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:5173',
        methods: ['POST', 'DELETE'],
        credentials: true,
    });
    await app.listen(3000);
}
function main() {
}
bootstrap();
main();
//# sourceMappingURL=main.js.map