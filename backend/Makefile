DATASOURCE=./app/infrastructure/datasources/databases/typeorm/index.ts
DATASOURCE_BUILD=./build/infrastructure/datasources/databases/typeorm/index.js
MIGRATIONS=./migrations

.PHONY: create generate run revert

create:
	@echo "📦 Creating migration: $(MIG)"
	@test -n "$(MIG)" || (echo "❌ Use: make create MIG=NameOfMigration" && exit 1)
	yarn tsx ../node_modules/typeorm/cli.js migration:create $(MIGRATIONS)/$(MIG)


TSX_FLAGS=-r tsconfig-paths/register -r reflect-metadata

generate:
	@echo "Creating migration: $(MIG)"
	@test -n "$(MIG)" || (echo "❌ Use: make generate MIG=NameOfMigration" && exit 1)
	yarn tsx $(TSX_FLAGS) ../node_modules/typeorm/cli.js migration:generate -d $(DATASOURCE) -o $(MIGRATIONS)/$(MIG)

run:
	yarn tsx $(TSX_FLAGS) ../node_modules/typeorm/cli.js migration:run -d $(DATASOURCE)

revert:
	yarn tsx $(TSX_FLAGS) ../node_modules/typeorm/cli.js migration:revert -d $(DATASOURCE)


