# Serve Application using Nginx Server
FROM nginx:alpine
COPY --from=build /app/dist/reserv-app/ /usr/share/nginx/html
EXPOSE 80
EXPOSE 443