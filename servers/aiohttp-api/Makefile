FLAGS=


clean:
	rm -rf `find . -name __pycache__`
	rm -f `find . -type f -name '*.py[co]' `
	rm -f `find . -type f -name '*~' `
	rm -f `find . -type f -name '.*~' `
	rm -f `find . -type f -name '@*' `
	rm -f `find . -type f -name '#*#' `
	rm -f `find . -type f -name '*.orig' `
	rm -f `find . -type f -name '*.rej' `
	rm -f .coverage
	rm -rf coverage
	rm -rf build
	rm -rf htmlcov
	rm -rf dist

run:
	python -m server

fake_data:
	python ./src/server/utils/init_db.py

docker_start_pg:
	docker-compose -f tests/docker-compose.yml up -d db

docker_stop_pg:
	docker-compose -f tests/docker-compose.yml stop postgres:10

.PHONY: clean