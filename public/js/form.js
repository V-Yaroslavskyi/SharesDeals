function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
    $.map(unindexed_array, function (n, i) {
        if (n['value'] !== "") {
            indexed_array[n['name']] = n['value'];
        }
    });

    return indexed_array;
}

$(document).ready(function () {

    var indices = [1];


    $("#but-add").click(function () {

        var $div = $('div[id^="row-f"]:last');
        var num = parseInt($div.prop("id").match(/\d+/g), 10) + 1;

        indices += [num];

        var t = $("#row-f1:last").clone()
            .appendTo(".wrap1")
            .prop('id', 'row-f' + num);
        $(t).find("input[type=number],input[type=text],textarea").val('');


    });

    var form = $("#infoForm");

    form.submit(function (e) {

        var url = "/form"; // the script where you handle the form input.
        var arr = [], elements = $('.ro'), names = '';

        for (var i = 0; i < elements.length; i++) {
            arr.push(getFormData($('#' + elements[i].id + ' :input')));
        }
        var sendData = arr;

        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(sendData), // serializes the form's elements.
            success: function (e) {
                window.location = e.url
            },
            error: function (e) {
                window.location = e.url
            },
            dataType: 'json',
            contentType: "application/json"
        });


        e.preventDefault(); // avoid to execute the actual submit of the form.
    });

    var info = JSON.parse($("#data").val());
    if (info !== undefined) {

        $(".name").text(info[0].name);
        $(".share").text("Share: " + info[0].share + "%");
        $(".addr").text("Wallet address: " + info[0].addr);
        $(".desc").text("Role: " + info[0].desc);


        for (var i = 1; i < info.length; i++) {
            var el = info[i];
            var t = $("#patt").clone()
                .appendTo(".row");

            $(t).find(".name").text(el.name);
            $(t).find(".share").text("Share: " + el.share + "%");
            $(t).find(".addr").text("Wallet address: " + el.addr);
            $(t).find(".desc").text("Role: " + el.desc);


        }
        $("#gen").click(function () {

            $.ajax({
                type: "POST",
                url: "/generate",
                data: JSON.stringify(info), // serializes the form's elements.
                success: function (e) {
                    window.location = e.url
                },
                error: function (e) {
                    window.location = e.url
                },
                dataType: 'json',
                contentType: "application/json"
            });
        });
    }


});