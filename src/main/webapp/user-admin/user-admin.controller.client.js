(function () {
    var $usernameFld, $passwordFld;
    var $firstNameFld, $lastNameFld, $roleFld;
    var $removeBtn, $editBtn, $createUserBtn;
    var $userRowTemplate, $tbody;
    var userService = new AdminUserServiceClient();
    var allUsers
    $(main);
    const usersData = [];

    function main() {
        console.log("coming in main====>>>")

        $createUserBtn = $('.wbdv-create-user');

        $userRowTemplate = $('.wbdv-template');
        $tbody = $('tbody')
        // $removeBtn = $('')
        // $editBtn = $('')
        console.log("coming in this=====>>>")
        $createUserBtn.click(createUser);

        userService
            .findAllUsers()
            .then(renderUsers)


    }
    function createUser() {
        // $createUserBtn.click(createUser);
        //
        // userService
        //     .findAllUsers()
        //     .then(renderUsers)

        $usernameFld = $('#usernameFld')[0].value;
        $passwordFld = $('#passwordFld')[0].value;
        $firstNameFld = $('#firstNameFld')[0].value;
        $lastNameFld = $('#lastNameFld')[0].value;
        $roleFld = $('#roleFld')[0].value;

        console.log("doneee", $usernameFld, $passwordFld, $firstNameFld, $lastNameFld, $roleFld)

        var user = {
            username: $usernameFld,
            password: $passwordFld,
            firstName: $firstNameFld,
            lastName: $lastNameFld,
            role: $roleFld
        }

        userService
            .createUser(user)
            .then(renderUsers)
    }
     function deleteUser(event) {
         console.log("eventTarget",event.target)
         console.log("eventtt",event)
         var deleteBtn = jQuery(event.target)
         var theClass = deleteBtn.attr("class")
         var theIndex = deleteBtn.attr("id")
         console.log("hereeeee=====>", theIndex)
         var theId = allUsers[theIndex]._id
         console.log(theClass)
         console.log(theIndex)

         userService.deleteUser(theId)
             .then(function (status) {
                 allUsers.splice(theIndex, 1)
                 renderUsers(allUsers)
             })
     }
     var selectedUser = null
     function selectUser(event) {
         const selectBtn = jQuery(event.target)
         const theId = selectBtn.attr("id")

         selectedUser = allUsers.find(user => user._id === theId)
         console.log("selectedUsers here=====>>", selectedUser)

         $("#usernameFld").val(selectedUser.username);
         $("#passwordFld").val(selectedUser.password);
         $("#firstNameFld").val(selectedUser.firstName);
         $("#lastNameFld").val(selectedUser.lastName);
         $("#roleFld").val(selectedUser.role);

     }
    // function updateUser() { … }
    function renderUsers(users) {
        $tbody.empty()
        console.log("users here====>>>", users, users.length)
        allUsers = users
        for(let u in users) {
            const user = users[u]

            $tbody
                .prepend(`
     <tr>
        <td>${user.username}</td>
        <td>${user.password}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.role}</td>
        <td>
            <button class="wbdv-delete" id="${u}">Delete</button>
            <button class="wbdv-select" id="${user._id}">Select</button>
        </td>
    </tr>
  `)

        }

        $(".wbdv-delete")
            .click(deleteUser)
        $(".wbdv-select")
            .click(selectUser)

        console.log("doneeee")
    }
    // function findAllUsers() { … } // optional - might not need this
    // function findUserById() { … } // optional - might not need this
})();
