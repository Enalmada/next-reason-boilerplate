# I move this to "old" so I could test on now.
# This was part of the serverless example https://github.com/skriems/next-material
# But I am not actually sure how it is used

FROM mhart/alpine-node

WORKDIR /app
COPY . .

RUN yarn install
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]
