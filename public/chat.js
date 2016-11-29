$(function() {

    // variable bindings
    var socket = io.connect();
    var $messageEntry = $('#messageEntry');
    var $message = $('#message');
    var $chat = $('#chat');
    var $chatlog = $('#chatlog');
    var $usernameEntry = $('#usernameEntry');
    var $usernameEntryForm = $('#usernameEntryForm');
    var $username = $('#username');

    // submit a message to the group chat
    $messageEntry.submit(function(e) {
        e.preventDefault();
        socket.emit('send message', $message.val());
        $message.val('');
    });

    // a new message is recieved from the server; display it
    socket.on('new message', function(data) {
        $chat.append('<div class="well"><strong>' + data.user + '</strong>: ' + data.msg + '</div>');
    });

    // submit your username
    $usernameEntryForm.submit(function(e) {
        e.preventDefault();
        socket.emit('new user', $username.val(), function(data) {
            if(data) {
                // hide the html asking for your username
                $usernameEntry.hide();

                // show the message area now that you are "logged in"
                $chatlog.show();
            }
        });
        $username.val('');
    });
});