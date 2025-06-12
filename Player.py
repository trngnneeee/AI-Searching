import turtle

class Player(turtle.Turtle):
    def __init__(self):
        turtle.Turtle.__init__(self)
        self.shape("square")
        self.color("blue")
        self.penup()
        self.speed(0)

    #move of player
    # def go_up(self):
    #     self.goto(self.xcor(), self.ycor() + 24)

    # def go_down(self):
    #     self.goto(self.xcor(), self.ycor() - 24)

    # def go_left(self):
    #     self.goto(self.xcor() - 24, self.ycor())
    
    # def go_right(self):
    #     self.goto(self.xcor() + 24, self.ycor())