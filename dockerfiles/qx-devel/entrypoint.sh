#!/bin/bash
GENERATOR=${QOOXDOO_PATH}/tool/bin/generator.py 

version()
{
  qx --help 2>&1 >/dev/null | grep  Versions
  # ${QOOXDOO_PATH}/tool/bin/generator.py --version
}

help()
{
  echo "This image provides qooxdoo compiler and generator CLI's on the same entrypoint"
  echo "qooxdoo compiler: -----------------------------" 
  qx --help
  echo "qooxdoo generator: -----------------------------" 
  echo "  jobs available: api, test"
  python $GENERATOR --help
}


run_qx_compiler()
{
  echo Running \'qx "$@"\' ...
  qx "$@"
}

run_generator()
{
  # Option 1: chdir project folder and execute  $GENERATOR <--

  echo Running \'python $GENERATOR "$@"\' ...
  python $GENERATOR "$@"

  # Option 2: copy stup in project folder, chdir project folder and execute stub there
  # Available jobs for $QOOXDOO_PATH/framework/generate.py. This is a stub job
  #
  #  - api
  #  - api-data     -- create api doc json data files
  #  - api-verify   -- creates an Apiviewer while checking internal links. Also creates an XML sitemap with a link for each class
  #  - clean        -- remove local cache and generated .js files (source/build)
  #  - clean-cache          -- remove the cache files
  #  - compile-framework-scss       -- Compile the theme scss
  #  - dependencies
  #  - distclean    -- remove the cache and all generated artefacts of this library (source, build, ...)
  #  - fix          -- normalize whitespace in .js files of the current library (tabs, eol, ...)
  #  - images       -- clip and combine all images used in the framework
  #  - info         -- collects environment information like the qooxdoo version etc., and prints it out
  #  - lint
  #  - lint-test
  #  - pretty-test  -- This is just to test pretty-printing - don't commit after running.
  #  - provider     -- create a provider structure, with code, dependency info, etc.
  #  - test
  #  - test-inline
  #  - test-mobile
  #  - test-mobile-compile-scss     -- Compile the theme scss once
  #  - test-mobile-source
  #  - test-performance     -- Create a Performance Test Runner for the qx.test.performance namespace
  #  - test-performance-source      -- Create a Performance Test Runner for the qx.test.performance namespace
  #  - test-source
  #  - translation
  #  - validate-config      -- validates the 'config.json' itself - if jobname arg is given checks dedicated job only
  #  - validate-manifest    -- validates the given filepath as manifest (defaults to './Manifest.json')
  #
}

case $1 in
  --version ) version
            ;;
  --help ) help
            ;;
  test| api ) python $GENERATOR "$@"
            ;;
  * ) qx "$@"
esac
