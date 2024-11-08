<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use File;

class ClearLogs extends Command
{
    protected $signature = 'logs:clear';
    protected $description = 'Clear all Laravel log files without deleting them';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $logPath = storage_path('logs');


        foreach (glob($logPath . '/*.log') as $logFile) {
            if (File::exists($logFile)) {
                file_put_contents($logFile, ''); // Clear the file contents
            }
        }

        $this->info('Logs have been cleared.');
    }
}
