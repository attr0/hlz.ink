$(document).ready(function() {
    // 神代綺凜原js部分
    (function() {
        var b = !0;
        window.setInterval(function() {}, 300);
        window.setInterval(function() {
            if (document.getElementById("aboutPage")) {
                var a = document.getElementById("aboutPage"),
                    b = a.contentWindow.document.getElementById("mainc");
                try {
                    a.style.height = b.scrollHeight + "px"
                } catch (e) {}
            }
        }, 300);

    })();


    // <div id="bg"></div> 添加背景div
    $('#header').before('<div id="bg"></div>');

    // 优化主页面无法点击图片进入文章
    // if (!$('.post-meta .ahover').length > 0) {
    //     setHref(getHref());
    // }


})


$(window).load(function() {
    1 < location.hash.length && $('.tocify-item[data-unique="' + decodeURI(location.hash.substr(1)) + '"]').click()
});

function updateLiveStatus(b) {
    1 == b.data.liveStatus && $("#bilibili-live").removeClass("hide")
};

function getHref() {
    var hrefArr = [];
    $('.post-meta .index-post-title>a').each(function() {
        hrefArr.push($(this).attr('href'));
        $(this).find('span').addClass('sticky');
    });
    // console.log(hrefArr);
    return hrefArr;
}

function setHref(arr) {
    $('.post-meta').each(function(index) {
        $(this).append('<a href="' + arr[index] + '" class="ahover"></a>')
    });
}

// 彩色标签云
function colorfulTags() {
    var tags = document.querySelectorAll("#tag_cloud-2 a,.list-group-item .pull-right ");
    var colorArr = ["#FF69B4", "#58c7ea", "#E066FF", "#FF69B4", "#FFA54F", "#90EE90", "#428BCA", "#AEDCAE", "#ECA9A7", "#DA99FF", "#FFB380", "#D9B999", "#3bca6e", "#f23232", "#834e75", "#23b7e5", "#f60", ];
    tags.forEach(tag => {
        tagsColor = colorArr[Math.floor(Math.random() * colorArr.length)];
        tag.style.backgroundColor = tagsColor;
    });
    var tags_left = document.querySelectorAll(".nav-icon svg ");
    var tmp = 0;
    tags_left.forEach(tag => {
        tagsColor = colorArr[tmp += 1];
        tag.style.color = tagsColor;
    });
}

// 标题卖萌
function moeTitle() {
    var OriginTitile = document.title;
    var d;
    document.addEventListener("visibilitychange", function() {
        document.hidden ? (clearTimeout(d), d = setTimeout(function() {
            document.title =
                "|\uff65\u03c9\uff65\uff40\u0029\u4f60\u770b\u4e0d\u89c1\u6211\u2026\u2026"
        }, 500)) : (document.title = "_(:3\u300d\u300d\u8fd8\u662f\u88ab\u53d1\u73b0\u4e86", d =
            setTimeout(function() {
                document.title = OriginTitile
            }, 2E3))
    })
}