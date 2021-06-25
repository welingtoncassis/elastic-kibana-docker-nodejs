docker run -d --name kibana \
 -p 5601:5601 \
 --restart=always \
 -e "ELASTICSEARCH_HOSTS=http://elastic:9200" \
 -e XPACK_GRAPH_ENABLED=true \
 -e XPACK_WATCHER_ENABLED=true \
 -e XPACK_ML_ENABLED=true \
 -e XPACK_MONITORING_ENABLED=true \
 -e XPACK_MONITORING_UI_CONTAINER_ELASTICSEARCH_ENABLED \
 --network=elastic \
 docker.elastic.co/kibana/kibana:7.11.0