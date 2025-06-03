
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Dumbbell, Plus, Play, Pause, RotateCcw } from "lucide-react";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
}

interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  duration: number;
  date: Date;
  completed: boolean;
}

const WorkoutLogger = () => {
  const { toast } = useToast();
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [workoutTime, setWorkoutTime] = useState(0);
  
  const [workouts] = useState<Workout[]>([
    {
      id: "1",
      name: "Upper Body Strength",
      exercises: [
        { id: "1", name: "Bench Press", sets: 3, reps: 10, weight: 185 },
        { id: "2", name: "Pull-ups", sets: 3, reps: 8 },
        { id: "3", name: "Shoulder Press", sets: 3, reps: 12, weight: 95 }
      ],
      duration: 45,
      date: new Date(),
      completed: true
    }
  ]);

  const [newExercise, setNewExercise] = useState({
    name: "",
    sets: "",
    reps: "",
    weight: ""
  });

  const exerciseLibrary = [
    "Bench Press", "Squats", "Deadlifts", "Pull-ups", "Push-ups", 
    "Shoulder Press", "Bicep Curls", "Tricep Dips", "Lunges", "Planks"
  ];

  const startWorkout = (workoutName: string) => {
    const workout: Workout = {
      id: Date.now().toString(),
      name: workoutName,
      exercises: [],
      duration: 0,
      date: new Date(),
      completed: false
    };
    
    setActiveWorkout(workout);
    setWorkoutTime(0);
    setIsTimerRunning(true);
    
    toast({
      title: "Workout Started",
      description: `${workoutName} workout has begun!`,
    });
  };

  const addExerciseToWorkout = () => {
    if (!activeWorkout || !newExercise.name || !newExercise.sets || !newExercise.reps) return;

    const exercise: Exercise = {
      id: Date.now().toString(),
      name: newExercise.name,
      sets: parseInt(newExercise.sets),
      reps: parseInt(newExercise.reps),
      weight: newExercise.weight ? parseFloat(newExercise.weight) : undefined
    };

    setActiveWorkout({
      ...activeWorkout,
      exercises: [...activeWorkout.exercises, exercise]
    });

    setNewExercise({ name: "", sets: "", reps: "", weight: "" });
    
    toast({
      title: "Exercise Added",
      description: `${exercise.name} added to workout.`,
    });
  };

  const finishWorkout = () => {
    if (!activeWorkout) return;

    setActiveWorkout(null);
    setIsTimerRunning(false);
    
    toast({
      title: "Workout Completed!",
      description: `Great job! You worked out for ${Math.floor(workoutTime / 60)} minutes.`,
    });
  };

  // Timer effect would go here in a real implementation

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-orange-600" />
          Workout Logger
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!activeWorkout ? (
          /* Start Workout Section */
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={() => startWorkout("Upper Body")}
                className="h-20 flex flex-col"
              >
                <Dumbbell className="h-6 w-6 mb-1" />
                Upper Body
              </Button>
              <Button 
                onClick={() => startWorkout("Lower Body")}
                className="h-20 flex flex-col"
                variant="outline"
              >
                <Dumbbell className="h-6 w-6 mb-1" />
                Lower Body
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={() => startWorkout("Cardio")}
                className="h-20 flex flex-col"
                variant="outline"
              >
                <Play className="h-6 w-6 mb-1" />
                Cardio
              </Button>
              <Button 
                onClick={() => startWorkout("Full Body")}
                className="h-20 flex flex-col"
                variant="outline"
              >
                <RotateCcw className="h-6 w-6 mb-1" />
                Full Body
              </Button>
            </div>

            {/* Recent Workouts */}
            <div className="space-y-2">
              <h4 className="font-semibold">Recent Workouts</h4>
              {workouts.slice(0, 3).map((workout) => (
                <div key={workout.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-medium">{workout.name}</h5>
                      <p className="text-sm text-muted-foreground">
                        {workout.exercises.length} exercises • {workout.duration} min
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {workout.date.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Active Workout Section */
          <div className="space-y-4">
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">{activeWorkout.name}</h3>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                  >
                    {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <span className="font-mono text-lg">
                    {Math.floor(workoutTime / 60)}:{(workoutTime % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

            {/* Add Exercise */}
            <div className="border rounded-lg p-4 space-y-3">
              <h4 className="font-semibold">Add Exercise</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                  <Label htmlFor="exercise-name">Exercise</Label>
                  <select
                    id="exercise-name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newExercise.name}
                    onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                  >
                    <option value="">Select exercise...</option>
                    {exerciseLibrary.map(exercise => (
                      <option key={exercise} value={exercise}>{exercise}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="exercise-sets">Sets</Label>
                  <Input
                    id="exercise-sets"
                    type="number"
                    value={newExercise.sets}
                    onChange={(e) => setNewExercise({ ...newExercise, sets: e.target.value })}
                    placeholder="3"
                  />
                </div>
                <div>
                  <Label htmlFor="exercise-reps">Reps</Label>
                  <Input
                    id="exercise-reps"
                    type="number"
                    value={newExercise.reps}
                    onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
                    placeholder="10"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="exercise-weight">Weight (lbs) - Optional</Label>
                  <Input
                    id="exercise-weight"
                    type="number"
                    value={newExercise.weight}
                    onChange={(e) => setNewExercise({ ...newExercise, weight: e.target.value })}
                    placeholder="185"
                  />
                </div>
              </div>
              <Button onClick={addExerciseToWorkout} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Exercise
              </Button>
            </div>

            {/* Current Exercises */}
            {activeWorkout.exercises.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold">Today's Exercises</h4>
                {activeWorkout.exercises.map((exercise) => (
                  <div key={exercise.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="font-medium">{exercise.name}</h5>
                        <p className="text-sm text-muted-foreground">
                          {exercise.sets} sets × {exercise.reps} reps
                          {exercise.weight && ` @ ${exercise.weight} lbs`}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Button onClick={finishWorkout} className="w-full" size="lg">
              Finish Workout
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkoutLogger;
