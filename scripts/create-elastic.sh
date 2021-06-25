docker run -d --name elastic \
 -p 9200:9200 -p 9300:9300 \
 --restart=always \
 -e "http.host=0.0.0.0" \
 -e "discovery.type=single-node" \
 --network=elastic \
 -v /docker/elastic/data:/usr/share/elasticsearch/data \
 docker.elastic.co/elasticsearch/elasticsearch:7.13.0