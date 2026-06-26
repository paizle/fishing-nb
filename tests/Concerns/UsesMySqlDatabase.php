<?php

namespace Tests\Concerns;

use Illuminate\Support\Facades\DB;

/**
 * Point the test application at the local MySQL database from .env
 * instead of phpunit.xml's in-memory SQLite.
 *
 * Safe for read-only integration tests — does not run migrations or
 * RefreshDatabase.
 */
trait UsesMySqlDatabase
{
	protected function setUp(): void
	{
		parent::setUp();

		$credentials = $this->mysqlCredentialsFromEnvFile();
		if ($credentials === null) {
			$this->markTestSkipped('Local .env with MySQL credentials not found.');
		}

		config([
			'database.default' => 'mysql',
			'database.connections.mysql' => array_merge(
				config('database.connections.mysql'),
				$credentials,
			),
		]);

		DB::purge('mysql');

		try {
			DB::connection('mysql')->getPdo();
		} catch (\Throwable $e) {
			$this->markTestSkipped('MySQL not reachable: ' . $e->getMessage());
		}
	}

	/** @return array<string, string>|null */
	private function mysqlCredentialsFromEnvFile(): ?array
	{
		$envPath = dirname(__DIR__, 2) . '/.env';
		if (! is_readable($envPath)) {
			return null;
		}

		$values = [];
		foreach (file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
			$line = trim($line);
			if ($line === '' || str_starts_with($line, '#') || ! str_contains($line, '=')) {
				continue;
			}
			[$key, $value] = explode('=', $line, 2);
			$values[trim($key)] = trim($value, " \t\"'");
		}

		if (($values['DB_CONNECTION'] ?? '') !== 'mysql' || empty($values['DB_DATABASE'])) {
			return null;
		}

		return [
			'driver' => 'mysql',
			'host' => $values['DB_HOST'] ?? '127.0.0.1',
			'port' => $values['DB_PORT'] ?? '3306',
			'database' => $values['DB_DATABASE'],
			'username' => $values['DB_USERNAME'] ?? 'root',
			'password' => $values['DB_PASSWORD'] ?? '',
		];
	}
}
