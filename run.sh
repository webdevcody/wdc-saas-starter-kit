#!/bin/bash

pushd ./drizzle/migrate
npm run db:migrate
popd 

node server.js
