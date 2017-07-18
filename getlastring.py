from ring_doorbell import Ring
import slackweb
from tinydb import TinyDB, Query
import json
from pprint import pprint

with open('Secrets.json') as data_file:    
    Secrets = json.load(data_file)

    db = TinyDB('/home/provolot/_CRONTABBED/messyring/db.json')
    Bell = Query()

    slack = slackweb.Slack(url=Secrets[u'slack'][u'webhookUri'])
    myring = Ring(Secrets[u'ring'][u'email'], Secrets[u'ring'][u'password'])

    doorbell = myring.doorbells[0]

    result = db.search(Bell.doorbell_recording_id == doorbell.last_recording_id)

    if(len(result) == 0):
        # no doorbell
        print("New Doorbell!: " + str(doorbell.last_recording_id))
        url = doorbell.recording_url(doorbell.last_recording_id)
        db.insert({'doorbell_recording_id':doorbell.last_recording_id})
        slack.notify(channel="#_front_door", username="Doorbell-bot", icon_emoji=":robot_face:", text="Video from the most recent ring: <" + url + "|click here>");
    else:
        print("No new doorbell.")

