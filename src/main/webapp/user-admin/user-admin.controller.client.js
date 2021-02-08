(function () {
    var $usernameFld, $passwordFld;
    var $firstNameFld, $lastNameFld, $roleFld;
    var $removeBtn, $editUserBtn, $createUserBtn;
    var $userRowTemplate, $tbody;
    var userService = new AdminUserServiceClient();
    var allUsers = []
    $(main);
    const usersData = [];

    function main() {

        $createUserBtn = $('.wbdv-create-user');
        $editUserBtn = $('.wbdv-edit-user');
        $userRowTemplate = $('.wbdv-template');
        $tbody = $('tbody')
        $createUserBtn.click(createUser);
        $editUserBtn.click(updateUser);
        userService
            .findAllUsers()
            .then(renderUsers)

    }
    function createUser() {

        $usernameFld = $('#usernameFld')[0].value;
        $passwordFld = $('#passwordFld')[0].value;
        $firstNameFld = $('#firstNameFld')[0].value;
        $lastNameFld = $('#lastNameFld')[0].value;
        $roleFld = $('#roleFld')[0].value;

        var user = {
            username: $usernameFld,
            password: $passwordFld,
            firstName: $firstNameFld,
            lastName: $lastNameFld,
            role: $roleFld
        }

        userService
            .createUser(user)
            .then(function (actualUser) {
                allUsers.push(actualUser)
                clearForm()
                renderUsers(allUsers)
            })
    }
    function deleteUser(event) {
         var deleteBtn = jQuery(event.target)
         var theClass = deleteBtn.attr("class")
         var theIndex = deleteBtn.attr("id")
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

         $("#usernameFld").val(selectedUser.username);
         $("#passwordFld").val(selectedUser.password);
         $("#firstNameFld").val(selectedUser.firstName);
         $("#lastNameFld").val(selectedUser.lastName);
         $("#roleFld").val(selectedUser.role);

     }
     function updateUser() {

         selectedUser.username = $("#usernameFld")[0].value;
         selectedUser.password = $("#passwordFld")[0].value;
         selectedUser.firstName =  $("#firstNameFld")[0].value;
         selectedUser.lastName = $("#lastNameFld")[0].value;
         selectedUser.role = $("#roleFld")[0].value;
         userService.updateUser(selectedUser._id, selectedUser)
             .then(function (status) {
                 var index = allUsers.findIndex(user => user._id === selectedUser._id)
                 allUsers[index] = selectedUser
                 clearForm()
                 renderUsers(allUsers)
             })
     }
    function renderUsers(users) {
        $tbody.empty()
        if(allUsers == undefined || allUsers.length == 0)
            allUsers = users
        for(let u in users) {
            const user = users[u]

            $tbody
                .prepend(`
     <tr>
        <td>${user.username}</td>
        <td class="hide-password">${user.password}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.role}</td>
        <td>
          <i class="fa-2x fa fa-times wbdv-delete" id="${u}"></i>
          <i class="fa-2x fa fa-pencil wbdv-select" id="${user._id}"></i>
            
        </td>
    </tr>
  `)

        }

        $(".wbdv-delete")
            .click(deleteUser)
        $(".wbdv-select")
            .click(selectUser)

    }
    // function findAllUsers() { … } // optional - might not need this
    // function findUserById() { … } // optional - might not need this
    function clearForm() {
        $("#usernameFld")[0].value = "";
        $("#passwordFld")[0].value = "";
        $("#firstNameFld")[0].value = "";
        $("#lastNameFld")[0].value = ""
        return
    }
})();
