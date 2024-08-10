<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $table = 'task';
    protected $fillable = [
        'task_title',
        'task_description', 
        'task_status',
        'task_piority',
        'employee_id'
    ];
}
