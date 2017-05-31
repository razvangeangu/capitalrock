clear ; close all; clc

data = load('ex1data1.txt');
X = data(:, 1); y = data(:, 2);
m = length(y); % number of training examples

Xvander = data(:,1);
A = ones(length(Xvander), 6);
for i = 2 : 6
    A(:, i) = (Xvander.^(i - 1));
end

[A mu sigma] = featureNormalize(A);

alpha = 0.01;
num_iters = 400;

% Init Theta and Run Gradient Descent 
theta2 = zeros(6, 1);
[theta2] = gradientDescentMulti(A, y, theta2, alpha, num_iters);
disp(theta2);

plotData(X, y); % Plot data