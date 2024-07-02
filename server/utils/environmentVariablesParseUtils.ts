export function getIntegerEnvVarOrDefault(envVariable: string | undefined, defaultValue: number) {
    const envVar = parseInt(envVariable || '');
    const envVarOrConst = Number.isInteger(envVar) ? envVar : defaultValue;
    return envVarOrConst;
}