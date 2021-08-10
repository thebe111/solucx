test:
	docker-compose run --rm \
		--use-aliases \
		--no-deps \
		--entrypoint "./docker/tests/all.sh" \
		app

unit-test:
	docker-compose run --rm \
		--use-aliases \
		--no-deps \
		--entrypoint "./docker/tests/unit.sh" \
		app

integration-test:
	docker-compose run --rm \
		--use-aliases \
		--no-deps \
		--entrypoint "./docker/tests/integration.sh" \
		app

e2e-test:
	docker-compose run --rm \
		--use-aliases \
		--no-deps \
		--entrypoint "./docker/tests/e2e.sh" \
		app

cli:
	docker-compose run --rm \
		--use-aliases \
		--no-deps \
		--entrypoint "bash" \
		app

.PHONY: test
