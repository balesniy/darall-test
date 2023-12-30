# Makefile for local development

rebuild_backend:
	docker compose down -v
	docker compose run backend npm run build

start_project:
	docker compose down -v
	docker compose up --build

run_server:
	docker compose down -v
	docker compose up --build backend

install_backend_dependencies:
	cd backend; echo "...Installing server dependencies" && \
	npm ci

install_frontend_dependencies:
	cd frontend; echo "...Installing client dependencies" && \
	npm ci

install_dependencies: install_backend_dependencies install_frontend_dependencies
