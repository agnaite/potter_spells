def count(filename):
    the_file = open(filename)

    data = {
        "charm": 0,
        "spell": 0,
        "jinx":  0,
        "curse": 0
    }

    for line in the_file:
        split_line = line.split(',')

        if "Charm" in line:
            data["charm"] += 1
        elif "Spell" in line:
            data["spell"] += 1
        elif "Curse" in line:
            data["curse"] += 1
        else:
            data["jinx"] += 1

    print data

count("data.csv")