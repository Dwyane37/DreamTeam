import uuid


def getuuid2():
    uid = uuid.uuid4().int
    uid_str = str(uid)[:10]
    return int(uid_str)


def getTime(datetime):
    datetime = datetime.datetime.now()
    timestamp = datetime.strftime("%Y-%m-%d %H:%M:%S")
    return timestamp