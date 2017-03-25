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
    constructor(name, artist, url, id, source, user)
    {
        this.name = name;
        this.artist = artist;
        this.url = url;
        this.id = id;
        this.source = source; // 0 for youtube, 1 for soundcloud
        //this.totalUpvote = 0;
        //this.totalDownvote = 0;
        this.totalVote = 1;
        this.user = user;
        this.length = 0;  // in seconds
        this.img = url;
    }

/*
    incrementUpvote(val)
    {
        this.totalUpvote += val;
    }

    incrementDownvote(val)
    {
        this.totalDownvote += val;
    }
    */

    updateVote(val)
    {
        this.totalVote += val;
    }

    updateLength(newVal)
    {
        this.length = newVal;
    }

    // debug purposes mostly
    printSong()
    {
      //  name, artist, url, id, source, user;
        console.log(this.name);
        console.log(this.artist);
        console.log(this.url);
        console.log(this.id);
        console.log(this.source);
        console.log(this.user);
        console.log("Upvote: " + this.totalUpvote + " Downvote: " + this.totalDownvote);
    }
}

class Songlist
{
    constructor()
    {
        this.songlist = new Array();
        this.currentSongList = 0;
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
      //  name, artist, url, id, source, user;
        var curr = this.currentSong();
        console.log(curr.name);
        console.log(curr.artist);
        console.log(curr.url);
        console.log(curr.id);
        console.log(curr.source);
        console.log(curr.user);
        console.log("Upvote: " + curr.totalUpvote + " Downvote: " + curr.totalDownvote);
    }
}

class User
{
    constructor(name, uuid)
    {
        this.name = name;
        this.uuid = uuid;
        //this.upvote = 0;
        //this.downvote = 0;
        this.vote = 1;
        this.uploadedSongs = new Array();
    }

    changeVote()
    {
        this.vote = this.vote * -1;
    }

    /*
    updateUpvote()
    {
        this.upvote = (this.upvote+1)%2;
    }

    updateDownvote()
    {
        this.downvote = (this.downvote+1)%2;
    }
    */
}


const mySonglist = new Songlist();
const myUser = new User("bob", 10);
const song = new Song("testName", "testArtist", "testUrl", 5, 1, myUser);
myUser.uploadedSongs.push(song);
myUser.changeVote();


mySonglist.addSong(song);

mySonglist.printSong();
