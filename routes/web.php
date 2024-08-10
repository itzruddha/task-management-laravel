<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskManagementController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', [TaskManagementController::class, 'taskList'])->name('task.index');


Route::group(['prefix' => 'api/v1'], function () {
    Route::get('/get-task-type', [TaskManagementController::class, 'api_get_task_piority']);
    Route::get('/get-employee-list', [TaskManagementController::class, 'api_get_employee_list']);
    Route::get('/get-task-list', [TaskManagementController::class, 'api_get_task_list']);
    Route::post('/get-task-details', [TaskManagementController::class, 'api_task_details']);

    Route::post('/task-save', [TaskManagementController::class, 'api_task_save']);
    Route::post('/task-update', [TaskManagementController::class, 'api_task_update']);
    Route::post('/task-delete', [TaskManagementController::class, 'api_task_delete']);
    Route::post('/task-status-change', [TaskManagementController::class, 'api_tas_status_change']);

    Route::post('/task-search', [TaskManagementController::class, 'api_get_task_search']);


});
