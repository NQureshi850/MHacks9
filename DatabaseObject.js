class DatabaseObject
{
    constructor(title, code, arraySong, arrayUser)
    {
        this.title = title;
        this.code = code;
        this.songQueue = arraySong;
        this.arrayUser = arrayUser;
    }
}

class Song
{
    constructor(album, artist, name, url, id, source, user)
    {
        this.album = album;
        this.artist = artist;
        this.name = name;
        this.url = url;
        this.id = id;
        this.source = source; // 0 for youtube, 1 for soundcloud
        this.totalVote = 1;
        this.skipVotes = 0;
        this.user = user;
        this.time = 0;  // in seconds
        this.img = url;
    }

    updateSkipVote(val)
    {
        this.skipVotes += val;
    }

    updateVote(val)
    {
        this.totalVote += val;
    }

    updateLength(newVal)
    {
        this.time = newVal;
    }

    // debug purposes mostly
    printSong()
    {
      //  name, artist, url, id, source, user;
        console.log(this.album);
        console.log(this.artist);
        console.log(this.name);
        console.log(this.url);
        console.log(this.id);
        console.log(this.source);
        console.log(this.user);
        console.log("Total Votes: " + this.totalVote);
    }
}

class Songlist
{
    constructor()
    {
        this.songlist = new Array();
        this.currentSongList = 0;
        this.currTimer = 0;
        //firebase.database().ref().set(new Song());
    }

    startSong()
    {
        if(this.currentSong() != null)
        {
            setTimeout(this.nextSong, this.currentSong.length * 1000);
        }
    }

    nextSong()
    {
        this.removeSong();
        if(this.currentSong() != null)
        {
            this.startSong();
        }
    }

    //removes from top of q
    removeSong()
    {
        this.currentSongList++;
    }

    addSong(toAdd)
    {
        this.songlist.push(toAdd);
    }

    // debuf purposes mostly
    currentSong()
    {
        return this.songlist[this.currentSongList];
    }

    // debug purposes mostly
    printSong()
    {
        var curr = this.currentSong();
        curr.printSong();
    }
}

class User
{
    constructor(name, uuid)
    {
        this.name = name;
        this.uuid = uuid;
        this.vote = 1;
        this.skipVote = 0;
        this.uploadedSongs = new Array();
    }

    changeVote()
    {
        this.vote = this.vote * -1;

    }

    changeSkipVote()
    {
        this.skipVote = (this.skipVote + 1)%2;
    }
}
