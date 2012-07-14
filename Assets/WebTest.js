#pragma strict

import System.Collections.Generic;

//function Start () {
//    var www = WWW(
//            "http://static-a.yahoo-mbga.jp/static/img/platform/upload/pc/3/9/39a7e0c7c4aafd2233fc779b84f13a35.png");
//    yield www;

//    Debug.Log(www.text);

//    renderer.material.mainTexture = www.texture;


//    var clip = WWW("http://translate.google.com/translate_tts?tl=en&q=helloworld");

//    yield www2;

//    audio.clip = www2.GetAudioClip(false, false, AudioType.MPEG);
//    audio.Play();
//}


function Start () {
    var www = WWW("http://api.twitter.com/1/statuses/user_timeline.json?screen_name=Mari_navi");
    yield www;

    Debug.Log(www.text);

    var list = MiniJSON.Json.Deserialize(www.text) as List.<Object>;

    for (var i=0; i<list.Count; i++) {
        var entry = list[i] as Dictionary.<String, Object>;
        Debug.Log(entry["text"]);
    }

    var user = entry["user"] as Dictionary.<String, Object>;
    //var icon = WWW(user["profile_image_url"]);
    var icon = WWW("http://a0.twimg.com/profile_images/2149287829/image_reasonably_small.jpg");
    yield icon;

    renderer.material.mainTexture = icon.texture;

    for (i=0; i<list.Count; i++) {
        entry = list[i] as Dictionary.<String, Object>;
        var text = entry["text"] as String;
        for (var p=16; p<text.Length; p+=17) {
            text = text.Insert(p, "\n");
        }

        GameObject.Find("Tweet").GetComponent.<TextMesh>().text = text;
        GameObject.Find("Balloon Pivot").animation.Play();

        var www2 = WWW("http://translate.google.com/translate_tts?tl=en&q=Mari%20navi");
        yield www2;
        audio.clip = www2.GetAudioClip(false, false, AudioType.MPEG);
        audio.Play();

        yield WaitForSeconds(5.0);
    }
}

// http://api.twitter.com/1/statuses/user_timeline.json?screen_name=Mari_navi
