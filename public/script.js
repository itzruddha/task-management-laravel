
console.log('task loding');

window.task = {
    el: "#task",
    data: {
        params: {
            name: '',
            parent: '',
            status: '',
            mode: 'save',
        },

    },

    init() {
        this.onStart();
    },

    onStart() {
        var self = task;


        self.listeners();
        self.list();
    },

    listeners() {
        var self = task;

       

       

        $.ajax({
            url: baseurl+'/api/v1/get-task-type',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                // Clear existing table rows
                $('#taskTable tbody').empty();
                var row ='';

                // Loop through tasks and append rows to the table
                $.each(response, function(index, task) {
                    var row =
                        `<option value='${task.priority}'>${task.priority}</option>`;

                       console.log('tasktype', row)
                       
                    $('#taskPriority').append(row);
                    $('#taskPioritySearch').append(row);
                });

                //console.log('tasktype', row)
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
        });

        $.ajax({
            url: baseurl+'/api/v1/get-employee-list',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
               
                
                var row ='';
                $.each(response, function(index, task) {
                    var row =
                        `<option value='${task.id}'>${task.employee_name}</option>`;

                       console.log('tasktype', row)
                       
                    $('#employeeName').append(row);
                    $('#employeeNameSearch').append(row);
                });

                //console.log('tasktype', row)
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    },

    validate() {
        var self = task;
        const preg_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var preg_name = /^[A-Za-z. ]+$/;
        var regx = /[^0-9]+/g;
        var errors = [];

        self.init_errors();

        var taskname = $('#taskName').val();
        var taskdesc = $('#taskDescription').val()    



        if (taskname.length == 0) {
            $('#taskName').css('border', '1px solid red');
            $('#taskName').parent('div').find('.error').text("Please enter Task");
            errors.push('taskName');
        }
        if (taskname.length > 0 && !preg_name.test(taskname)) {
            $('#taskName').css('border', '1px solid red');
            $('#taskName').parent('div').find('.error').text("Invalid charecter. Special characters and numbers not allowed!");
            errors.push('taskName');
        }

        
        if (taskdesc.length == 0) {
            $('#taskDescription').css('border', '1px solid red');
            $('#taskDescription').parent('div').find('.error').text("Please enter Task Description");
            errors.push('taskDescription');
        }
        
        

        console.log([errors, errors.length]);
        return (errors.length == 0) ? true : false;
    },
    save() {
        var self = task;

        console.log('mode status',this.data.params.mode)

        if(this.data.params.mode === 'save'){
           var url = baseurl+'/api/v1/task-save';
            var formData = {
                // Example data, replace with your actual data
                'task_title': $('#taskName').val(),
                'task_description': $('#taskDescription').val(),
                'task_piority': $('#taskPriority').val(),
                'employee_id': $('#employeeName').val()
            };
        }else{
           var url = baseurl+'/api/v1/task-update';
            var formData = {
                // Example data, replace with your actual data
                'id': this.data.params.id,
                'task_title': $('#taskName').val(),
                'task_description': $('#taskDescription').val(),
                'task_piority': $('#taskPriority').val(),
                'employee_id': $('#employeeName').val()
            };
        }
            
        if (self.validate()) {
            // Send AJAX request
            $.ajax({
                type: 'POST',
                url: url,
                data: formData,
                dataType: 'json',
                success: function(data) {
                    // Handle success response
                    alert(data);
                    $('#addTaskModal').hide();
                    $('#task').removeClass('modal-open');
                    self.list();
                },
                error: function(xhr, status, error) {
                    // Handle error response
                    console.error(xhr.responseText);
                }
            });
            
        }
    },

    edit(id){

        this.data.params.mode = 'edit';
        this.data.params.id =id;
        $('#addTaskModal').show();

        var formData = {
            
            'id': id,
        };

        $.ajax({
            url: baseurl + '/api/v1/get-task-details',
            type: 'post',
            dataType: 'json',
            data: formData,
            success: function(response) {

                console.log(response);
                $('#taskName').val(response.task_title),
                $('#taskDescription').val(response.task_description),
                $('#taskPriority').val(response.task_piority),
                $('#employeeName').val(response.employee_id)

                
                
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
        });

    },

    delete(id){
        var self = task; 

        var result = window.confirm("Are you sure Want To Delete Task?");

        if(result == true){
            var formData = {
            
                'id': id,
            };
    
            $.ajax({
                url: baseurl + '/api/v1/task-delete',
                type: 'post',
                dataType: 'json',
                data: formData,
                success: function(response) {
    
                    alert('Task Deleted Successfully');
                    self.list();
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });

        }

    },

    status_change(id){
        var self = task; 

        var result = window.confirm("Are you sure Want To Change Status?");

        if(result == true){
            var formData = {
            
                'id': id,
                'task_status' : $(status_change).val(),
            };
    
            $.ajax({
                url: baseurl + '/api/v1/task-status-change',
                type: 'post',
                dataType: 'json',
                data: formData,
                success: function(response) {
    
                    alert('Task Status Change Successfully');
                    self.list();
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });

        }

    },

    list(){

        var self = task;

        $.ajax({
            url: baseurl + '/api/v1/get-task-list',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                
                $('#taskTable tbody').empty();
                $.each(response, function(index, task) {

                    var tsk = '';

                    if(task.task_piority === 'High'){
                        var tsk = `<div class="container text-danger" >${task.task_piority}</div>`;
                    }

                    if(task.task_piority === 'Medium'){
                        var tsk = `<div class="container text-success" >${task.task_piority}</div>`;
                    }

                    if(task.task_piority === 'Low'){
                        var tsk = `<div class="container text-warning" >${task.task_piority}</div>`;
                    }
                    var row = '<tr>' +
                        '<td>' + task.id + '</td>' +
                        '<td>' + task.task_title + '</td>' +
                        '<td>' + task.task_description + '</td>' +
                        `
                        
                        <td>  ${tsk}  </td>
                        ` +
                        '<td>' + task.employee_name + '</td>' +
                        `<td>
                        <select class="form-control" id="status_change" onchange="task.status_change(${task.id})">
                        <option value = "1" ${(task.task_status === 1)? 'selected': ''}>Pending</option>
                        <option value = "2" ${(task.task_status === 2)? 'selected': ''}>Complete</option>
                        <select>
                        </td>` +
                        `<td><button type='button' onclick="task.edit(${task.id})" class="btn btn-sm btn-primary">Edit</button> <button type='button' onclick="task.delete(${task.id})" class="btn btn-sm btn-danger">Delete</button></td>` + 
                        '</tr>';
                    $('#taskTable tbody').append(row);
                    
                });
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
        });

    },

    search(){

        var self = task;

        var formData = {
           
            'task_title' : $('#taskNameSearch').val(),
            'task_status' : $('#taskStatus').val(),
            'employee_id' : $('#employeeNameSearch').val(),
            'taskpiority' : $('#taskpiority').val(),

            
        };

        $.ajax({
            url: baseurl + '/api/v1/task-search',
            type: 'POST',
            dataType: 'json',
            data: formData,
            success: function(response) {
                
                $('#taskTable tbody').empty();
                $.each(response, function(index, task) {

                    var tsk = '';

                    if(task.task_piority === 'High'){
                        var tsk = `<div class="container text-danger" >${task.task_piority}</div>`;
                    }

                    if(task.task_piority === 'Medium'){
                        var tsk = `<div class="container text-success" >${task.task_piority}</div>`;
                    }

                    if(task.task_piority === 'Low'){
                        var tsk = `<div class="container text-warning" >${task.task_piority}</div>`;
                    }
                    var row = '<tr>' +
                        '<td>' + task.id + '</td>' +
                        '<td>' + task.task_title + '</td>' +
                        '<td>' + task.task_description + '</td>' +
                        '<td>' + tsk + '</td>' +
                        '<td>' + task.employee_name + '</td>' +
                        `<td>
                        <select class="form-control" id="status_change" onchange="task.status_change(${task.id})">
                        <option value = "1" ${(task.task_status === 1)? 'selected': ''}>Pending</option>
                        <option value = "2" ${(task.task_status === 2)? 'selected': ''}>Complete</option>
                        <select>
                        </td>` +
                        `<td><button type='button' onclick="task.edit(${task.id})" class="btn btn-sm btn-primary">Edit</button> <button type='button' onclick="task.delete(${task.id})" class="btn btn-sm btn-danger">Delete</button></td>` + 
                        '</tr>';
                    $('#taskTable tbody').append(row);
                });
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
        });

    },

    open_modal(){

        var self = task;
        $('#addTaskModal').show();
    },

    close_model(){
        var self = task;
        $('#addTaskModal').hide();
    },


    init_errors() {
        var self = task;

        $('.form-control').css('border', '');
        $('#fcategories .error').text('');
    },


};


window.addEventListener('load', function (e) {
    task.init();
});

