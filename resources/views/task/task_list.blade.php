<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task List</title>
    <!-- Include Bootstrap CSS (optional) -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="{{url('/')}}/script.js"></script>
    <script>
        var baseurl = '{{env('APP_URL')}}';
    </script>
</head>
<body id="task">
    <div class="container mt-5">
        <h1 class="mb-4">Task List</h1>
        <!-- Button to trigger the modal -->
        <button type="button" class="btn btn-primary" onclick="task.open_modal()">
            Add Task
        </button>
        <div class="row"> 
            <input type="text" class="form-control"  id="taskNameSearch" placeholder="Search task name">
            <select type="text" class="form-control"  id="employeeNameSearch">

            </select>
            <select type="text" class="form-control" id="taskStatus">
                <option value="1">Pending</option>
                <option value="2">Complete</option>
            </select>

            <select type="text" class="form-control" id="taskpiority">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>

            <button type="button" class="btn btn-primary" onclick="task.search()">Search Task</button>
        </div>
        <table class="table" id="taskTable">
            <thead>
                <tr>
                    <th scope="col">Task ID</th>
                    <th scope="col">Task Name</th>
                    <th scope="col">Task DESC</th>
                    <th scope="col">Task Priority</th>
                    <th scope="col">Employee Name</th>
                    <th scope="col">Task Status</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <!-- Add your table rows from javascript -->
               
            </tbody>
        </table>
        {{-- <button class="btn btn-primary">Add Task</button> --}}
    </div>

     <!-- Add Task Modal -->
     <div class="modal" id="addTaskModal" tabindex="-1" role="dialog" aria-labelledby="addTaskModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addTaskModalLabel">Add Task</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="taskName">Task Name</label>
                            <input type="text" class="form-control" name="takname" id="taskName" placeholder="Enter task name">
                            <div class="error"></div>
                        </div>
                        <div class="form-group">
                            <label for="taskDescription">Task Description</label>
                            <textarea class="form-control" name="taskdescription" id="taskDescription" rows="3" placeholder="Enter task description"></textarea>
                            <div class="error"> </div>
                        </div>
                        <div class="form-group">
                            <label for="taskPriority">Task Priority</label>
                            <select class="form-control" name="taskpiority" id="taskPriority">
                               
                            </select>
                            <div class="error"> </div>
                        </div>
                        <div class="form-group">
                            <label for="employeeName">Employee Name</label>
                            <select type="text" class="form-control" name="employeeName" id="employeeName">

                            </select>
                            <div class="error"> </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="task.close_model()">Close</button>
                    <button type="button" class="btn btn-primary" onclick="task.save()">Save Task</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Include Bootstrap JS (optional) -->
    
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
