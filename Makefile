db-up:
	@docker compose up -d

db-down:
	@docker compose down

migrate:
	@npm run prisma:migrate

generate:
	@npm run prisma:generate

server:
	@npm run dev

dev: db-down db-up migrate generate server

frontend:
	@python -m http.server 8080 || npx http-server -p 8080
