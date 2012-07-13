#pragma strict

import System.Collections.Generic;

private var tweets : String[];

function SayHello() {
    var www = WWW("http://translate.google.com/translate_tts?tl=en&q=Shumai%20death!");
    yield www;
    audio.PlayOneShot(www.GetAudioClip(false, false, AudioType.MPEG));
}

function WrapText(text : String) {
    for (var i = 16; i < text.Length; i += 16) {
        text = text.Insert(i, "\n");
    }
    return text;
}

function Start() {
    var www = WWW("https://api.twitter.com/1/statuses/user_timeline.json?screen_name=shuumai");
    yield www;
    
    var list = MiniJSON.Json.Deserialize(www.text) as List.<Object>;
    var icon : WWW;
    
    tweets = new String[list.Count];
    
    for (var i = 0; i < tweets.Length; i++) {
        var entry : Dictionary.<String, Object> = list[i];
        tweets[i] = entry["text"];
        if (!icon) {
            var user : Dictionary.<String, Object> = entry["user"];
            icon = WWW(user["profile_image_url"]);
        }
    }
    
    yield icon;
    GameObject.Find("Face").renderer.material.mainTexture = icon.texture;
    
    while (true) {
        for (var tweet in tweets) {
            var mesh = GameObject.Find("Tweet").GetComponent.<TextMesh>();
            mesh.text = WrapText(tweet);
            
            GameObject.Find("Balloon Pivot").animation.Play();
            
            yield WaitForSeconds(2.0);
        }
    }
}
