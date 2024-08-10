<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\TaskType;
use App\Models\Employee;
use DB;

class TaskManagementController extends Controller
{
    //

    public function taskList(){


        return view('task.task_list');
    }


    public function api_get_task_piority() {
        
        $taskpiority = TaskType::all();

        return response()->json($taskpiority);
    }

    public function api_get_employee_list(){

        $employee = Employee::all();

        return response()->json($employee);
    }

    public function api_get_task_list(){

        $tasks = DB::table('task')
        ->select('task.id', 'task.task_title', 'task.task_description', 'task.task_piority','employee.employee_name as employee_name', 'task.task_status')
        ->join('employee', 'task.employee_id', '=', 'employee.id')->orderBy('id', 'DESC')
        ->get();

        return response()->json($tasks);
    }

    public function api_get_task_search(Request $request){

        
        $empid = $request->employee_id;

        $q = DB::table('task');

        if($request->task_title != null){
            $q->where('task_title', 'like', '%' . $request->task_title . '%');
        }

        if($request->task_status != null){
            $q->where('task_status', $request->task_status);
        }

        if($request->employee_id != null){
            $q->where('task.employee_id', '=', $empid);
        }

        if($request->taskpiority != null){
            $q->where('task_piority', '=', $request->taskpiority);
        }
        
        
        $tasks = $q->select('task.id', 'task.task_title', 'task.task_description', 'task.task_piority','employee.employee_name as employee_name', 'task.task_status')
        ->join('employee', 'task.employee_id', '=', 'employee.id')->orderBy('id', 'DESC')->get();

        return response()->json($tasks);

    }

    public function api_task_save(Request $requets){

        //dd($requets->all());

        $savetask = Task::create([
            'task_title' => $requets->task_title,
            'task_description' => $requets->task_description,
            'task_status' => 1,
            'task_piority' => $requets->task_piority,
            'employee_id' => $requets->employee_id,
        ]);

        return response()->json('success');
    }

    public function api_task_details(Request $requets) {
        $taskdetails = Task::where('id', $requets->id)->first();

        return response()->json($taskdetails);
    }

    public function api_task_update(Request $requets){

        $savetask = Task::where('id', $requets->id)->update([
            'task_title' => $requets->task_title,
            'task_description' => $requets->task_description,
            'task_status' => 1,
            'task_piority' => $requets->task_piority,
            'employee_id' => $requets->employee_id,
        ]);

        return response()->json('success');
    }

    public function api_task_delete(Request $request){
        $task = Task::where('id', $request->id)->delete();

        return response()->json('success');
    }

    public function api_tas_status_change(Request $request){
        
        $savetask = Task::where('id', $request->id)->update([
           
            'task_status' => $request->task_status,
            
        ]);

        return response()->json('success');
    }
}
