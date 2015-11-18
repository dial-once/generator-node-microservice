#Exposed port for statistics/health check
PORT=3000

# your broker connexion string
AMQP_URL=amqp://localhost

# the mongodb connexion string
MONGO_URL=mongodb://localhost/db

#local queue arg to append to isolate service when wired on an existing queue
LOCAL_QUEUE=